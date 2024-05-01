"use client"

import styled from "styled-components"

const DivLoader = styled.div`
    border-width: 4px;
    border-style: solid;
    border-top-width: 4px;
    border-top-style: solid;
    width: 16px;
    height: 16px;
`;

export default function Loader() {
    return (
        <DivLoader className="inline-block border-myNeutral-white border-t-navyBlue-0 rounded-full animate-spin"></DivLoader>
    );
}