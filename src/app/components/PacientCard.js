const PacientCard = ({ pacient, onCreateProcess }) => {
    return (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg w-full">
            <h2 className="text-white text-xl font-bold">{pacient.pacient_nome}</h2>
            <p className="text-gray-300">CPF: {pacient.pacient_cpf}</p>
            <button 
                onClick={() => onCreateProcess(pacient.pacient_id)} 
                className="mt-2 bg-green-500 text-white p-2 rounded-lg"
            >
                Criar Processo
            </button>
        </div>
    );
};

export default PacientCard;