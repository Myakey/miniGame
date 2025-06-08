export default function ConfirmationModal({
  isOpen,
  title,
  description,
  gainsText,
  lossesText,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      {gainsText && <p className="text-sm text-green-600 font-semibold">Gains: {gainsText}</p>}
      {lossesText && <p className="text-sm text-red-600 font-semibold mb-4">Loses: {lossesText}</p>}
      <div className="flex justify-center space-x-3 mt-5">
        <button onClick={onCancel} className="px-4 py-2 ...">No / Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 ...">Yes / Confirm</button>
      </div>
    </Modal>
  );
}
