import { Drawer, DrawerBody, DrawerContent } from '@nextui-org/react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) => {
  return (
    <Drawer
      backdrop={'transparent'}
      isOpen={isOpen}
      size={'2xl'}
      onOpenChange={onClose}
      placement="bottom"
      style={{ maxWidth: '28rem', margin: '0 auto' }}
    >
      <DrawerContent>
        {(onClose) => (
          <DrawerBody>
            <div className="p-4 space-y-6">
              <div className="flex justify-center">
                <div className="w-12 h-1.5 bg-default-200 rounded-full" />
              </div>
              {children}
            </div>
          </DrawerBody>
        )}
      </DrawerContent>
    </Drawer>
  )
}
