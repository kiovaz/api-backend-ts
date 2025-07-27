import axios from 'axios';

interface WeatherResponse {
    weather: [{
        main: string;
        description: string;
    }];
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    name: string;
}

interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
}

export const getWeatherByCep = async (cep: string): Promise<WeatherData | null> => {
    try {
        const API_KEY = process.env.OPENWEATHER_API_KEY;
        
        if (!API_KEY) {
            console.error('OpenWeather API key não configurada');
            return null;
        }

        // Limpar CEP
        const cleanCep = cep.replace(/\D/g, '');

        if (cleanCep.length !== 8) {
            return null;
        }

        // OpenWeather API aceita CEP brasileiro no formato: CEP,BR
        const response = await axios.get<WeatherResponse>(
            `https://api.openweathermap.org/data/2.5/weather?zip=${cleanCep},BR&appid=${API_KEY}&units=metric&lang=pt_br`
        );

        const { weather, main, name } = response.data;

        return {
            city: name,
            temperature: Math.round(main.temp),
            description: weather[0].description,
            humidity: main.humidity
        };

    } catch (error) {
        console.error('Erro ao buscar clima:', error);
        return null;
    }
};