'use client';

import React, { useState } from 'react';
import axios from 'axios';

const Navbar = ({ onSearch }) => {
    const [cpf, setCpf] = useState('');

    const handleCpfChange = (e) => {
        setCpf(e.target.value);
    };

    const handleSearch = async () => {
        if (!cpf) {
            alert('Por favor, insira um CPF.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5114/api/Pacient/${cpf}`);
            if (response.data) {
                onSearch(response.data); // Passa os dados do paciente para o componente pai
            } else {
                alert('Paciente não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar paciente:', error);
            alert('Erro ao buscar paciente');
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex flex-col items-start">
                <div className="flex items-center">
                    <h1 className="text-white text-2xl font-bold">MVFlow</h1>
                    <span className="text-gray-300 ml-4">Médico</span>
                </div>

                <div className="mt-4 flex items-center w-full">
                    <input
                        type="text"
                        value={cpf}
                        onChange={handleCpfChange}
                        placeholder="Pesquisar por CPF"
                        className="p-2 rounded-l-lg focus:outline-none w-full md:w-auto"
                    />
                    <button 
                        onClick={handleSearch} 
                        className="bg-blue-500 text-white p-2 rounded-r-lg"
                    >
                        Pesquisar
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;