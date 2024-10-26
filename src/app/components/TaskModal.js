import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskModal = ({ isOpen, onClose, onAddTasks, processId }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5114/api/Task');
                setTasks(response.data);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };

        if (isOpen) {
            fetchTasks();
        }
    }, [isOpen]);

    const handleCheckboxChange = (taskId) => {
        setSelectedTasks((prevSelected) => {
            if (prevSelected.includes(taskId)) {
                return prevSelected.filter((id) => id !== taskId);
            } else {
                return [...prevSelected, taskId];
            }
        });
    };

    const handleAddTasks = () => {
        onAddTasks(selectedTasks);
        onClose(); // Fecha o modal após adicionar as tarefas
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Adicionar Tarefas</h2>
                <div className="max-h-60 overflow-y-auto">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`task-${task.id}`}
                                onChange={() => handleCheckboxChange(task.id)}
                                checked={selectedTasks.includes(task.id)}
                            />
                            <label htmlFor={`task-${task.id}`} className="ml-2">
                                {task.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button className="mr-2 bg-gray-300 p-2 rounded" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddTasks}>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
