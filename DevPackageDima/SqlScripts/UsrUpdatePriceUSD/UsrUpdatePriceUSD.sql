update UsrRealty
set 
  UsrCommissionUSD = UsrPriceUSD * T.UsrCoeff
from UsrRealty R
join UsrRealtyOfferType T on T.Id = R.UsrOfferTypeId
where UsrPriceUSD <> 0 and UsrOfferTypeId is not null
and UsrCommissionUSD <> UsrPriceUSD * T.UsrCoeff