
"use client";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";

export default function Component() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Button className="rounded xl bg-lime-500 text-white text-6xl" onClick={() => setOpenModal(true)}>Info</Button>
      <Modal className="" show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="text-amber-400 bg-zinc-900 text-4xl text" >Event ???</ModalHeader>
        <ModalBody>
          <div className="space-y-6 bg-red-900">
       
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
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
                        <img src="/Assets/Svg/LogoLeckerladen.svg" className="inline w-20 h-12 objectfit-contain  align-middle" />{' '}
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
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
