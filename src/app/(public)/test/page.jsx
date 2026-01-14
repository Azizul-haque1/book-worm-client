import getUser from '@/app/lib/getUser'
import React from 'react'

export default async function page() {
    const user = await getUser()
    // console.log('test', user);
    return (
        <div>page</div>
    )
}
