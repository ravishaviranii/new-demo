
import React from 'react'
import { ProfileContext } from '../usecontext/useContext';
import { useContext } from 'react';

function PermissionCheck(page, type) {

    let { pagePermission } = useContext(ProfileContext);

    const campaignsPage = pagePermission?.find(item => item.pageName === page)?.allocatedActions;
    const subCondition = campaignsPage?.find(action => action.actionType === type)?.status;

    return subCondition

}


export { PermissionCheck }