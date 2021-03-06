import React, { useState } from "react";

type ModalContextProps = {
  isModalOpen: boolean;
  modalContent: JSX.Element;
  openModal: () => void;
  closeModal: () => void;
  setModalContent: (el: JSX.Element) => void;
  openAndSetModalContent: (el: JSX.Element) => void;
};

const ModalContext = React.createContext<ModalContextProps>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalContent: <></>,
  setModalContent: (el: JSX.Element) => {},
  openAndSetModalContent: (el: JSX.Element) => {},
});

type Props = {
  children: React.ReactNode;
};

export const useModalContext = () => React.useContext(ModalContext);

export const ModalContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(
    <>Empty Form for Adding New Snippets</>
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openAndSetModalContent = (el: JSX.Element) => {
    openModal();
    setModalContent(el);
  };
  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        closeModal,
        openModal,
        openAndSetModalContent,
        setModalContent: (el: JSX.Element) => setModalContent(el),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
