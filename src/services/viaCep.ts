import axios from 'axios';

interface ViaCepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean;
}

export const getAddressByCep = async (cep: string): Promise<string | null> => {
    try {
        // Limpar CEP (remover traços, espaços)
        const cleanCep = cep.replace(/\D/g, '');

        // Validar formato
        if (cleanCep.length !== 8) {
            return null;
        }

        const response = await axios.get<ViaCepResponse>(
            `https://viacep.com.br/ws/${cleanCep}/json/`
        );

        // ViaCEP retorna erro: true quando CEP não existe
        if (response.data.erro) {
            return null;
        }

        // Montar endereço completo
        const { logradouro, bairro, localidade, uf } = response.data;
        return `${logradouro}, ${bairro}, ${localidade} - ${uf}`;

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        return null;
    }
};