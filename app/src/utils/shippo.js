import shippo from "shippo";

const shippoAPIKey = "shippo_test_45abf4d29b1200973857dff28754a188962154ab";
const shippoClient = shippo(shippoAPIKey);

export const getShippoData = async () => {
  try {
    const senderAddress = {
      name: "Ms Hippo",
      company: "Shippo",
      street1: "215 Clayton St.",
      city: "San Francisco",
      state: "CA",
      zip: "94117",
      country: "US",
      phone: "+1 555 341 9393",
      email: "support@goshippo.com",
    };

    const recipientAddress = {
      name: "Ms Hippo",
      company: "Shippo",
      street1: "803 Clayton St.",
      city: "San Francisco",
      state: "CA",
      zip: "94117",
      country: "US",
      phone: "+1 555 341 9393",
      email: "support@goshippo.com",
    };

    const parcelOne = {
      length: "5",
      width: "5",
      height: "5",
      distance_unit: "in",
      weight: "2",
      mass_unit: "lb",
    };

    const parcelTwo = {
      length: "5",
      width: "5",
      height: "5",
      distance_unit: "in",
      weight: "2",
      mass_unit: "lb",
    };

    const shipment = {
      address_from: senderAddress,
      address_to: recipientAddress,
      parcels: [parcelOne, parcelTwo],
    };

    const createdTransaction = await shippoClient.transaction.create({
      shipment: shipment,
      servicelevel_token: "FedEx Ground",
      carrier_account: "558c84bbc25a4f609f9ba02da9791fe4",
      label_file_type: "png",
    });

    const { rate } = createdTransaction;

    const listedTransactions = await shippoClient.transaction.list({
      rate: rate,
    });

    listedTransactions.results.forEach((mpsTransaction) => {
      if (mpsTransaction.status === "SUCCESS") {
        console.log("Label URL: %s", mpsTransaction.label_url);
        console.log("Tracking Number: %s", mpsTransaction.tracking_number);
      } else {
        // handle error transactions
        console.log("Message: %s", mpsTransaction.messages);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Shipment creation or rate retrieval failed");
  }
};
