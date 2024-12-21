import React from 'react'
import { graphql } from 'relay-runtime'
import { RegularClassFragment$key } from '../../../__generated__/RegularClassFragment.graphql'
import { useFragment } from 'react-relay'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { TimeSlots } from '@app/components/TimeSlots'

const regularClassFragment = graphql`
    fragment RegularClassFragment on RegularClass
    @argumentDefinitions( date: { type: "Date!"})
    {
        _id,
        id,
        name,
        description,
        maximumClassSize,
        imageURL {
            altText,
            url
        }
        timeSlots(where: { day: $date }) {
            ...TimeSlotFragment
        }
    }
`
type RegularClassProps = {
  regularClass: RegularClassFragment$key
}

export const RegularClass = ({ regularClass }: RegularClassProps) => {
  const data = useFragment(regularClassFragment, regularClass)
  return (

    <Card key={data.id} className="py-4 mb-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">{data.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />

        <TimeSlots timeSlots={data.timeSlots} />
      </CardBody>
    </Card>

  )
}

