'use client';

import React, {MouseEvent, ReactNode} from "react";

interface MenuItemProps {
    onClick?: (event?: MouseEvent<HTMLDivElement>) => void;
    content: ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, content}) => {
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
