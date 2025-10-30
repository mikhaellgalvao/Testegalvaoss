
import { User, Product, Supplier } from './types';

export const COMPANY_INFO = {
  name: "Galvão Drones",
  cnpj: "60.102.179/0001-10",
  address: "R. 16, 304 - Qd.10 Lt.24 - Setor Aeroviario, Goiânia - GO, 74435-240",
  phone: "6236360668",
  email: "contato@galvaodrones.com.br"
};

export const INSTALLMENT_RATES: { [key: number]: number } = {
    2: 5.79, 3: 6.09, 4: 7.99, 5: 8.09, 6: 8.18, 7: 9.49, 8: 9.68, 9: 10.37, 10: 11.05, 11: 12.27, 12: 12.38
};

export const INITIAL_USERS: User[] = [
    { name: "Mikhaell Galvão", username: "mikhaell", password: "mk0639", phone: "62984710639", email: "mikhaell@galvaodrones.com.br", role: "Administrador" },
    { name: "Rafael Gomes", username: "rafael", password: "rf123", phone: "62993344356", email: "sem e-mail", role: "Vendedor" },
    { name: "Maikhon Galvão", username: "maikhon", password: "0639", phone: "62933001865", email: "maikhonvnc@gmail.com.br", role: "Administrador" },
    { name: "Ryan", username: "ryan", password: "0639", phone: "62920007396", email: "ryanrodriques@gmail.com.br", role: "Administrador" },
    { name: "Luan", username: "luan", password: "ln123", phone: "31990785671", email: "sem e-mail", role: "Vendedor" },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
    { 
        name: "GOHOBBY FUTURE TECHNOLOGY LTDA", 
        address: "AVENIDA MARGINAL PROJETADA N.1652 - GALPÃO 11 SALA 14, FAZENDA TAMBORE, BARUERI - SP - CEP:06460200", 
        details: "A GOHOBBY é importadora exclusiva de drones profissionais e tecnologias anti-drone no Brasil. Foco em Enterprise.", 
        phone: "11955973434", 
        paymentMethods: ["Pix", "Transferência"], 
        productTypes: ["Equipamentos", "Acessórios"], 
        productLines: ["Enterprise"] 
    },
    { 
        name: "GranSafra", 
        address: "Campinas", 
        details: "Foco na linha Consumer DJI.", 
        phone: "62981145767", 
        paymentMethods: ["Dinheiro", "Pix"], 
        productTypes: ["Equipamentos", "Acessórios"], 
        productLines: ["Consumer"] 
    }
];

const parseBRL = (brlString: string): number => {
    if (typeof brlString !== 'string') return 0;
    return parseFloat(brlString.replace(/\./g, '').replace(',', '.'));
};

const rawProductsData = [
    { name: "Drone DJI Neo Standard", cost: "1.351,50", sell: "2.000,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Neo Fly More Combo (sem tela)", cost: "2.534,70", sell: "3.600,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Neo Motion Fly More Combo", cost: "3.978,00", sell: "4.900,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Flip Standard (sem tela)", cost: "3.549,60", sell: "4.500,00", icon: "🛸", type: "Equipamentos", line: "FPV" },
    { name: "Drone DJI Flip Standard (com tela)", cost: "4.967,40", sell: "5.900,00", icon: "🛸", type: "Equipamentos", line: "FPV" },
    { name: "Drone DJI Flip Fly More Combo (com tela)", cost: "5.431,50", sell: "6.400,00", icon: "🛸", type: "Equipamentos", line: "FPV" },
    { name: "Drone DJI Mini 3 Standard (sem tela)", cost: "2.947,80", sell: "3.900,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Mini 3 Fly More Combo (com tela)", cost: "5.100,00", sell: "6.100,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Mini 4 Pro Standard (sem tela)", cost: "5.890,50", sell: "6.900,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Mini 4 Pro Standard (com tela)", cost: "6.375,00", sell: "7.400,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Mini 5 Pro Standard (sem tela)", cost: "6.732,00", sell: "7.700,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Mini 5 Pro Fly More Combo (sem tela)", cost: "8.241,60", sell: "9.300,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Mini 5 Pro Fly More Combo (com tela)", cost: "9.287,10", sell: "10.300,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Mini 5 Pro Fly More Combo Plus (com tela)", cost: "9.741,00", sell: "10.800,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Avata 2 Fly More Combo (1 bateria)", cost: "7.864,20", sell: "8.900,00", icon: "🛸", type: "Equipamentos", line: "FPV" },
    { name: "Drone DJI Avata 2 Fly More Combo (3 baterias)", cost: "8.925,00", sell: "9.900,00", icon: "🛸", type: "Equipamentos", line: "FPV" },
    { name: "Drone DJI Air 3 Fly More Combo (sem tela)", cost: "9.093,30", sell: "10.100,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Air 3s Standard (sem tela)", cost: "9.108,60", sell: "9.108,60", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Air 3s Fly More Combo (com tela)", cost: "12.148,20", sell: "13.100,00", icon: "🛸", type: "Equipamentos", line: "Consumer" },
    { name: "Drone DJI Mavic 4 Pro Fly More Combo (com tela)", cost: "21.756,60", sell: "24.500,00", icon: "🛸", type: "Equipamentos", line: "Enterprise" },
    { name: "Câmera DJI Osmo Action 4 Standard Combo", cost: "2.478,60", sell: "2.900,00", icon: "🎥", type: "Equipamentos", line: "Acessórios" },
    { name: "Câmera DJI Osmo Action 4 Adventure Combo", cost: "3.412,00", sell: "4.100,00", icon: "🎥", type: "Equipamentos", line: "Acessórios" },
    { name: "Câmera DJI Osmo Action 5 Pro Standard Combo", cost: "3.162,00", sell: "4.200,00", icon: "🎥", type: "Equipamentos", line: "Acessórios" },
    { name: "Câmera DJI Pocket 3 Standard", cost: "5.023,50", sell: "5.800,00", icon: "🎥", type: "Equipamentos", line: "Acessórios" },
    { name: "Câmera DJI Pocket 3 Combo", cost: "6.324,00", sell: "7.100,00", icon: "🎥", type: "Equipamentos", line: "Acessórios" },
    { name: "Estabilizador Osmo SE", cost: "627,30", sell: "900,00", icon: "🎛️", type: "Equipamentos", line: "Acessórios" },
    { name: "Estabilizador Osmo 7", cost: "892,50", sell: "1.350,00", icon: "🎛️", type: "Equipamentos", line: "Acessórios" },
    { name: "Estabilizador Osmo 6", cost: "994,50", sell: "1.200,00", icon: "🎛️", type: "Equipamentos", line: "Acessórios" },
    { name: "Estabilizador RS 4 Mini", cost: "2.748,90", sell: "3.000,00", icon: "🎛️", type: "Equipamentos", line: "Enterprise" },
    { name: "Estabilizador RS 4 Combo", cost: "5.635,50", sell: "7.100,00", icon: "🎛️", type: "Equipamentos", line: "Enterprise" },
    { name: "Microfone DJI Mic Mini (1 mic + 1 recp)", cost: "622,20", sell: "900,00", icon: "🎙️", type: "Acessórios", line: "Universal" },
    { name: "Microfone DJI Mic 2 (2 mic + 1 recp + 1 case)", cost: "2.912,10", sell: "3.600,00", icon: "🎙️", type: "Acessórios", line: "Universal" },
    { name: "Case para Air 2 / Air 2s", cost: "459,00", sell: "700,00", icon: "🔋", type: "Acessórios", line: "Consumer" },
    { name: "Fonte DJI 100W", cost: "438,60", sell: "700,00", icon: "🔋", type: "Acessórios", line: "Universal" },
    { name: "Controle RC Motion", cost: "714,00", sell: "928.20", icon: "🔋", type: "Acessórios", line: "FPV" },
    { name: "Controle DJI RC-N3 (sem tela)", cost: "984,30", sell: "1.200,00", icon: "🔋", type: "Acessórios", line: "Consumer" },
    { name: "Controle DJI RC 2 (com tela)", cost: "2.040,00", sell: "2.500,00", icon: "🔋", type: "Acessórios", line: "Consumer" },
    { name: "Bateria Mini 2 / SE", cost: "469,20", sell: "670,00", icon: "🔋", type: "Peças", line: "Consumer" },
    { name: "Bateria Mini 3 / 3 Pro / 4 Pro Plus", cost: "851,70", sell: "1.200,00", icon: "🔋", type: "Peças", line: "Consumer" },
    { name: "Bateria Avata", cost: "1.060,80", sell: "1.300,00", icon: "🔋", type: "Peças", line: "FPV" },
    { name: "Bateria Avata 2", cost: "775,20", sell: "1.430,00", icon: "🔋", type: "Peças", line: "FPV" },
    { name: "Bateria Air 3 / Air 3s", cost: "1.346,40", sell: "1.700,00", icon: "🔋", type: "Peças", line: "Consumer" },
    { name: "Hub de carregamento Mini 2 / SE", cost: "270,30", sell: "390,00", icon: "⚡", type: "Acessórios", line: "Consumer" },
    { name: "Hub de carregamento Mini 3 / 3 Pro / 4 Pro", cost: "408,00", sell: "580,00", icon: "⚡", type: "Acessórios", line: "Consumer" },
    { name: "Hub de carregamento Air 3 / Air 3s", cost: "612,00", sell: "810,00", icon: "⚡", type: "Acessórios", line: "Consumer" },
    { name: "Hub de carregamento Mavic 3", cost: "744,60", sell: "1.200,00", icon: "⚡", type: "Acessórios", line: "Consumer" },
    { name: "Par de hélices Mini 2 / SE", cost: "153,00", sell: "210,00", icon: "⚡", type: "Peças", line: "Consumer" },
    { name: "Par de hélices Air 2s", cost: "153,00", sell: "230,00", icon: "⚡", type: "Peças", line: "Consumer" },
    { name: "Protetor de hélices Neo", cost: "102,00", sell: "190,00", icon: "⚡", type: "Acessórios", line: "Consumer" },
    { name: "Protetor de hélices Mini 3", cost: "290,70", sell: "410,00", icon: "⚡", type: "Acessórios", line: "Consumer" },
];

let idCounter = 1000;
export const INITIAL_PRODUCTS: Product[] = rawProductsData.map(p => {
    let specContent: string;
    switch (p.icon) {
        case '🛸': specContent = `Drone profissional de alta performance e tecnologia de voo ${p.line}.`; break;
        case '🎥': specContent = `Câmera de ação com alta estabilidade e resolução 4K.`; break;
        case '🎛️': specContent = `Estabilizador de imagem com tecnologia de ponta.`; break;
        case '🎙️': specContent = `Microfone de lapela sem fio com alta qualidade de captação.`; break;
        case '🔋': specContent = `Acessório essencial para voo e manutenção.`; break;
        case '⚡': specContent = `Acessório de carregamento e propulsão.`; break;
        default: specContent = p.name;
    }
    const baseSpec = `${p.icon} ${p.name.replace(p.icon, '').trim()}`;
    
    let supplierNameForCost: string;
    if (p.line === "Enterprise") {
        supplierNameForCost = "GOHOBBY FUTURE TECHNOLOGY LTDA";
    } else {
        supplierNameForCost = "GranSafra";
    }

    return {
        id: (idCounter++).toString(),
        name: p.name,
        spec: `${baseSpec}.\nLinha: ${p.line}\nDetalhe: ${specContent}`,
        price: parseBRL(p.sell),
        suppliers: [{ name: supplierNameForCost, cost: parseBRL(p.cost) }],
        productTypes: [p.type],
        productLines: [p.line]
    };
});

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});
