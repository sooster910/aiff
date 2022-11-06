// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

import { DateTime } from 'luxon';
import { TimeSlotDTO } from '../../../types/timeslot';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let response;
    try {
        
   
        const { startDate, store, regularClassId } = req.query;
        
        if (!startDate) {
        return res.status(400).json({error:req})
    }
    if (Object.keys(req.query).length === 0) {
        const timeslots = JSON.parse( fs.readFileSync('db/timeSlots.json', 'utf-8'));
        
        return res.status(200).json(timeslots)
    } 
    const timeslots = JSON.parse( fs.readFileSync('db/timeSlots.json', 'utf-8'));
    // console.log("timeslots",timeslots)
        const qsYear = DateTime.fromSQL(startDate as string).get('year')
        const qsMonth = DateTime.fromSQL(startDate as string).get('month')
        const qsDay = DateTime.fromSQL(startDate as string).get('day')

        // console.log('year',year)
        
        const filteredByStartDate = timeslots.filter((timeslot:TimeSlotDTO) => {
            const year = DateTime.fromSQL(timeslot?.startDate).get('year')
            const month = DateTime.fromSQL(timeslot?.startDate).get('month')
            const day = DateTime.fromSQL(timeslot?.startDate).get('day')

            if (qsYear === year && qsMonth === month && qsDay === day) {
                return timeslot
            }
        })
        const filteredByStoreId =filteredByStartDate.filter((timeslot) => {
            return Number(store) === Number(timeslot.storeId)
        })
        
        response = filteredByStoreId.filter((timeslot)=> Number(timeslot.regularClassId)===Number(regularClassId))
    } catch (err) {
        console.log("err",err)
    }
        res.status(200).json(response)
    
}

export function msFromUtc(date: string) {
    
    return new Date(date).getTime()
}