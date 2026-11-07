import { Fragment, memo, useCallback } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useBudget } from "../hooks";
import { ExpenseForm } from "../components";

export default memo(function ExpenseModal() {
  const { state, dispatch } = useBudget();

  const handleOpenModal = useCallback(() => {
    dispatch({ type: "show-modal" });
  }, [dispatch]);

  const handleCloseModal = useCallback(
    () => dispatch({ type: "close-modal" }),
    [dispatch],
  );

  return (
    <>
      {/* Botón flotante con Tooltip corregido */}
      <div className="fixed right-6 bottom-6 z-20 group flex items-center gap-3">
        <span className="bg-gray-900/90 text-white text-sm font-semibold px-4 py-2 rounded-md uppercase shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap backdrop-blur-sm pointer-events-none">
          Añadir nuevo gasto
        </span>

        <button
          type="button"
          onClick={handleOpenModal}
          className="bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-2xl shadow-sky-600/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          aria-label="Agregar Gasto"
        >
          <PlusIcon className="w-8 h-8 transition-transform group-hover:rotate-90 duration-300" />
        </button>
      </div>

      <Transition appear as={Fragment} show={state.modal}>
        <Dialog as="div" onClose={handleCloseModal} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-4"
              >
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-6 sm:p-10 text-left align-middle shadow-2xl transition-all border border-gray-100">
                  <ExpenseForm />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
