import { FiShoppingBag } from "react-icons/fi";

export const links = [
    {
        title: "Dashboard",
        links: [
            {
                name: "users",
                to: "/admin/users",
                icon: <FiShoppingBag />,
            },
            {
                name: "puru",
                to: "/admin/puru",
                icon: <FiShoppingBag />,
            },
        ],
    },
];
