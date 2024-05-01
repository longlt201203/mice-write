import { PropsWithChildren } from "react";

export default function Button(props: PropsWithChildren<{
    onClick?: () => void;
    disabled?: boolean;
}>) {
    return (
        <button type="button" className="flex gap-x-1 items-center font-label px-2 py-1 bg-navyBlue-0 text-myNeutral-white rounded hover:bg-navyBlue-1" onClick={(e) => props.onClick && props.onClick()} disabled={props.disabled}>{props.children}</button>
    );
}