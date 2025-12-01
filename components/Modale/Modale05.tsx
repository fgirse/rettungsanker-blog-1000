
"use client";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";

export default function Component() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button className="w-36 uppercase rounded-xl bg-lime-500 text-white hover:bg-fuchsia-700" onClick={() => setOpenModal(true)}>
        <div className="flex justify-center items-center mb-2 gap-x-3">
          <svg className="w-12 h-12 rounded-full bg-white text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="236" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>

        <p className="text-3xl font-semibold text-gray-100 dark:text-white">
          Info 
        </p>
</div>
      </Button>
      <Modal className="" show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="text-amber-400 bg-zinc-900 uppercase text-4xl headingA" >Event ???</ModalHeader>
        <ModalBody>
          <div className="space-y-6 bg-zinc-800">
       
            <p className="text-base leading-relaxed text-gray-100 dark:text-gray-100 p-5">
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
                        <span className="font-bold text-yellow-600">
                          Catering
                        </span>{' '}
                        anbieten. Hier sind Ihren Wünschen im Grunde genommen
                        keine Grenzen gesetzt. <br />
                        <br /> Unsere Koperationspartner{' '}
                        <img src="/Assets/Svg/LogoLeckerladen.svg" className="inline w-24 h-24 objectfit-contain  align-middle" />{' '}
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
        </ModalBody>
        <ModalFooter>
          <Button className="rounded xl bg-lime-500 text-white text-6xl" onClick={() => setOpenModal(false)}>zurück</Button>

        </ModalFooter>
      </Modal>
    </>
  );
}
