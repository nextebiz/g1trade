import React from 'react'

interface Props {
    children: React.ReactNode
}

export default async function LayoutPublic({ children }: Props) {

    return (
        <>
            {children}
        </>
    )
}
