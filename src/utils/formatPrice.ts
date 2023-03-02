const CURRENCY_FORMATTER=new Intl.NumberFormat(undefined,{currency:'USD',style:'currency'})

export const formatPrice=(price:number)=>{
    return CURRENCY_FORMATTER.format(price);
}