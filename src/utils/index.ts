import { Duration } from 'luxon'

export const convertMin = () =>
  Duration.fromMillis(150000).toFormat("mm'm' ss's'")

type CreateSanitizer = (pattern:RegExp)=> (input:string )=> string

export const createSanitizer:CreateSanitizer = (pattern)=>(input)=>{
    return input.replace(pattern, "")
}

export const sanitizeSpecialChars = createSanitizer(/[^a-zA-Z가-힣0-9]/g)
