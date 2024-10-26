'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar'; // Importando a Navbar
import PacientCard from './components/PacientCard';
import TaskModal from './components/TaskModal'; // Importe o componente do modal
import axios from 'axios';
import { LocaleRouteNormalizer } from 'next/dist/server/normalizers/locale-route-normalizer';

export default function Home() {
    const router = useRouter();
    const [pacient, setPacient] = useState(null);
    //const [isModalOpen, setIsModalOpen] = useState(false);
    let userId;

    useEffect(() => {
        // Verifica se o usuário está autenticado
        const isAuthenticated = localStorage.getItem('auth');

        // Se não estiver autenticado, redireciona para a página de login
        if (!isAuthenticated) {
            router.push('/login');
        }

        if (localStorage.getItem('userId')) {
            userId = parseInt(localStorage.getItem('userId'));
        }
    }, [router]);

    const handleSearchResult = (data) => {
      setPacient(data);
    };

    const handleCreateProcess = async (pacientId) => {
      try {
        const response = await axios.post('http://localhost:5114/api/Process', {
          pacient_id: pacientId,
          user_id: 1,
        });
        console.log('Processo criado com sucesso:', response.data);
        alert('Processo criado com sucesso!'); // Feedback ao usuário
        return response.data.process_id; // Retorna o ID do processo criado
      } catch (error) {
        console.error('Erro ao criar processo:', error);
        alert('Erro ao criar processo');
      }
    };

    /* const handleAddTasks = async (selectedTasks) => {
      const processId = await handleCreateProcess(paciente.pacient_id);
      // Aqui você deve fazer a requisição para adicionar as tarefas ao processo
      console.log('Tarefas selecionadas:', selectedTasks);
      // Lógica para adicionar as tarefas ao processo
      // Exemplo: await axios.post(`http://localhost:5114/api/Process/${processId}/tasks`, { taskIds: selectedTasks });
    }; */

  return (
    <div>
        <Navbar onSearch={handleSearchResult} />
        {pacient && (
            <PacientCard pacient={pacient} onCreateProcess={handleCreateProcess} />
        )}
        {/* <TaskModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onAddTasks={handleAddTasks} 
            processId={pacient ? pacient.pacient_id : null}
        /> */}
    </div>
);
};
