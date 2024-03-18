import React from 'react'
import { useContext } from 'react'
import { ProfileContext } from '../usecontext/useContext'

function CurrencyCode(amount,code) {
    let {currencyCode} = useContext(ProfileContext)
    let currenccy
    if(code){
      currenccy = code
    }
    else{
      currenccy = currencyCode
    }
const currency = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currenccy,
}).format(amount);
  return currency
   
}

export default CurrencyCode