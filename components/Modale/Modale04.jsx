'use client';

import dynamic from 'next/dynamic'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import Tooltip from "../../utils/SimpleTooltip";

export default function Modale04() {  
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <div className="example-wrapper">
          <Tooltip
            content="click zur weiteren Informationen !!!"
            direction="right"
          >
            <button
              type="button"
              onClick={openModal}
              className="mb-[3vw] w-60 rounded-md border bg-green-500 bg-opacity-80 px-2 text-[1.33rem] font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <img className="inline p-4" src="data:image/png;base64,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"/>
              INFO
            </button>
          </Tooltip>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0  bg-slate-700/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="border-gray-100-500 w-full max-w-md transform overflow-hidden rounded-2xl border bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="h3"
                    className="text-4xl font-medium leading-6 text-amber-500 headingA text-center"
                  >
                    dein event ???
                  </Dialog.Title>
                <div className="mt-2 lg:mt-1 ">
                      <p className=" p-3 text-justify text-sm leading-5 text-gray-100 lg:text-[.95rem]">
                        Der Rettungsanker und seine Räumlichkeiten sind eine
                        ideale Location um Ihre privaten oder geschäftlichen
                        Anlässe wie Geburtstage, Hochzeiten und Verlobungen,
                        aber auch Firmen- oder Belegschaftspartys zu gestalten.
                        Im Rahmen einer &quot;geschlossenen Gesellschaft&quot;
                        steht Ihnen der Rettungsanker mit seinen Räumlichkeiten
                        für Ihre Feierlichkeiten zur Verfügung. <br />
                        <br />
                        Auch können wir Ihnen - falls dies erwünscht - ein
                        vollumfängliches{' '}
                        <span className="font-bold text-yellow-400">
                          Catering
                        </span>{' '}
                        anbieten. Hier sind Ihren Wünschen im Grunde genommen
                        keine Grenzen gesetzt. <br />
                        <br /> Unsere Koperationspartner{' '}
                        <img src="/LogoLeckerladen.svg" className="inline w-20 h-12 objectfit-contain  align-middle" />{' '}
                        sind für ausgezeichnete und ideenreiche Apero-Buffets
                        oder Menues besoders ausgewiesen und werden nichts
                        unversucht lassen Ihre Wünsche und Ideen umzusetzten.
                        <br />
                        <br /> Nähere Informationen zur Planung Ihres Events
                        besprechen wir am sinnvollsten nach{' '}
                        <span className="font-bold text-yellow-400">
                          Vereinbarung eines persönlichen Termins
                        </span>
                        . Senden Sie uns eine e-mail oder sprechen Sie uns
                        direkt im Rettungsanker an!!! Wir freuen uns Ihre
                        Feierlichkeiten professionell begleiten zu dürfen.
                        <br />
                        <br />
                        Michael Schreck und das Team Rettungsanker.
                      </p>
                    </div>
                                           <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      zurück
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