import React, { ReactNode } from 'react'
import LeafCommon from './LeafCommon'

function LeafCommonBranched({ children }: { children: ReactNode }) {
    return (
        <>
            <LeafCommon>
                {children}
            </LeafCommon>
        </>
    )
}

export default LeafCommonBranched
