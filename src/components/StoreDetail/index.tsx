import { graphql } from 'relay-compiler'
import { useFragment } from 'react-relay'
import type { StoreDetailFragment$key } from '../../../__generated__/StoreDetailFragment.graphql'
import {
  Modal,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'

const storeDetailFragment = graphql`
    # define a fragment
    fragment StoreDetailFragment on Store{
        _id,
        name,
        address,
        description,
    }
`

export const StoreDetail = ({ store }: { store: StoreDetailFragment$key }) => {
  const data = useFragment(storeDetailFragment, store)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <div onClick={onOpen}>지점 정보</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{data.name} 지점 정보</ModalHeader>
              <ModalBody>
                <p>{data.description}</p>
              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>)
}