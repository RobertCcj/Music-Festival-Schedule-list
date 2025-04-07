import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function StageFilter({ stages, selectedStages, onToggle }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#EF6D21] text-white rounded-lg hover:bg-[#df6319] transition-colors"
      >
        舞台選擇
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    選擇舞台
                  </Dialog.Title>
                  <div className="grid grid-cols-2 gap-2">
                    {stages.map(stage => (
                      <button
                        key={stage.id}
                        onClick={() => onToggle(stage.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedStages.includes(stage.id)
                            ? `${stage.color} text-white`
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {stage.name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-[#EF6D21] text-white rounded-lg hover:bg-[#df6319] transition-colors"
                    >
                      完成
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default StageFilter;