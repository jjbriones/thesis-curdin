'use client';

import { ReactNode } from "react";

interface MenuItemProps {
    onClick: () => void;
    content: string | ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, content }) => {
    return (
        <div
            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            onClick={onClick}
        >
            {content}
        </div>
    );
};

export default MenuItem;
