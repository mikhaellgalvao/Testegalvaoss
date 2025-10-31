
import React, { useState, useEffect } from 'react';
import { INITIAL_USERS, INITIAL_PRODUCTS, currencyFormatter } from './constants';
import type { Page, Product, User, UserRole } from './types';

// --- HELPER COMPONENTS (defined outside main App to prevent re-renders) ---

const Spinner: React.FC = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-orange"></div>
);

interface LoginViewProps {
    onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (userToLogin: User) => {
        setLoading(true);
        setError('');
        setTimeout(() => {
            onLogin(userToLogin);
        }, 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const foundUser = INITIAL_USERS.find(user => user.username === username && user.password === password);
        if (foundUser) {
            handleLogin(foundUser);
        } else {
            setError('Usuário ou senha inválidos.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                {!loading ? (
                    <>
                        <div className="text-center">
                            <img src="https://imgur.com/2PNy5CS.png" alt="Logo Galvão Drones" className="mx-auto mb-4 h-16 w-16" />
                            <h1 className="text-2xl font-bold text-brand-green dark:text-gray-100">Portal Galvão Drones</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Entre com seu usuário e senha</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div>
                                <label htmlFor="username-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Usuário</label>
                                <input type="text" id="username-input" required value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-brand-orange focus:border-brand-orange" />
                            </div>
                            <div>
                                <label htmlFor="password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                                <input type="password" id="password-input" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-brand-orange focus:border-brand-orange" />
                            </div>
                            {error && <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"><span className="font-medium">Erro de Acesso:</span> {error}</div>}
                            <button type="submit" className="group relative flex w-full justify-center rounded-lg border border-transparent bg-brand-green py-3 px-4 text-sm font-semibold text-white hover:bg-green-700">Entrar</button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <Spinner />
                        <p className="mt-4 font-semibold text-lg text-brand-green dark:text-gray-200">Login bem-sucedido!</p>
                        <p className="text-gray-600 dark:text-gray-400">Redirecionando...</p>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---

function App() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleLogin = (user: User) => {
        setCurrentUser(user);
        setCurrentPage('dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        setSidebarOpen(false);
    };

    if (!currentUser) {
        return <LoginView onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar user={currentUser} currentPage={currentPage} onNavigate={handleNavigate} isOpen={isSidebarOpen} />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header 
                  onLogout={handleLogout} 
                  page={currentPage} 
                  onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
                />
                <MainContent user={currentUser} page={currentPage} onNavigate={handleNavigate}/>
            </div>
        </div>
    );
}

// --- LAYOUT COMPONENTS ---

interface SidebarProps {
    user: User;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    isOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ user, currentPage, onNavigate, isOpen }) => {
    // FIX: Replaced JSX.Element with React.ReactElement to resolve namespace error.
    const navLinks: { page: Page; label: string; icon: React.ReactElement; roles: UserRole[] }[] = [
        { page: 'dashboard', label: 'Dashboard', icon: <HomeIcon />, roles: ['Administrador', 'Vendedor', 'Market', 'Consultas', 'Visitante'] },
        { page: 'consultas', label: 'Consultas', icon: <SearchIcon />, roles: ['Administrador', 'Vendedor', 'Consultas'] },
        { page: 'drones', label: 'Drones', icon: <DroneIcon />, roles: ['Administrador', 'Vendedor', 'Market', 'Consultas', 'Visitante'] },
        { page: 'marketing', label: 'Marketing', icon: <MegaphoneIcon />, roles: ['Administrador', 'Market'] },
        { page: 'produtos', label: 'Produtos', icon: <BoxIcon />, roles: ['Administrador', 'Vendedor', 'Market'] },
    ];
    // FIX: Replaced JSX.Element with React.ReactElement to resolve namespace error.
     const secondaryLinks: { page: Page; label: string; icon: React.ReactElement; roles: UserRole[] }[] = [
        { page: 'perfil', label: 'Meu Perfil', icon: <UserIcon />, roles: ['Administrador', 'Vendedor', 'Market', 'Consultas', 'Visitante'] },
        { page: 'admin', label: 'Administração', icon: <ShieldIcon />, roles: ['Administrador'] },
        { page: 'sobre', label: 'Sobre Galvão Drones', icon: <InfoIcon />, roles: ['Administrador', 'Vendedor', 'Market', 'Consultas', 'Visitante'] },
    ];

    const createLink = (link: typeof navLinks[0]) => {
         if (!link.roles.includes(user.role)) return null;
        return (
             <a
                key={link.page}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(link.page); }}
                className={`flex items-center px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ${currentPage === link.page ? 'bg-gray-200 dark:bg-gray-700 font-bold' : ''}`}
            >
                {link.icon}
                <span className="font-medium">{link.label}</span>
            </a>
        );
    };

    return (
        <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30 flex flex-col`}>
             <div className="flex items-center justify-center h-20 border-b dark:border-gray-700 px-4">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('perfil'); }} className="flex items-center w-full">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 bg-cover bg-center flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
                        Foto
                    </div>
                    <div className="ml-3 overflow-hidden">
                        <p className="font-semibold text-sm text-gray-800 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.role}</p>
                    </div>
                </a>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {navLinks.map(createLink)}
                <div className="pt-2 mt-auto border-t border-gray-200 dark:border-gray-700">
                     {secondaryLinks.map(createLink)}
                </div>
            </nav>
        </div>
    );
};

interface HeaderProps {
    onLogout: () => void;
    onMenuClick: () => void;
    page: Page;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onMenuClick, page }) => {
    const pageTitles: Record<Page, string> = {
        dashboard: 'Dashboard',
        consultas: 'Consultas',
        drones: 'Catálogo de Drones',
        marketing: 'Marketing',
        produtos: 'Produtos Internos',
        perfil: 'Meu Perfil',
        admin: 'Administração',
        sobre: 'Sobre Galvão Drones',
    };

    return (
        <div className="flex items-center justify-between h-20 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
            <button onClick={onMenuClick} className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">{pageTitles[page]}</h1>
            <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-brand-orange rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange">
                Sair
            </button>
        </div>
    );
};


interface MainContentProps {
    user: User;
    page: Page;
    onNavigate: (page: Page) => void;
}

const MainContent: React.FC<MainContentProps> = ({ user, page, onNavigate }) => {
    // This component will conditionally render the page content
    const renderPage = () => {
        switch (page) {
            case 'dashboard':
                return <DashboardPageContent user={user} onNavigate={onNavigate} />;
            case 'drones':
                return <ProductSearchPage key="drones" page="drones" user={user} />;
            case 'consultas':
                return <ProductSearchPage key="consultas" page="consultas" user={user} />;
             case 'produtos':
                return <ProductSearchPage key="produtos" page="produtos" user={user} />;
            case 'sobre':
                return <SobrePageContent />;
            case 'admin':
                return <AdminPageContent />;
            // Add other cases for other pages
            default:
                return <DashboardPageContent user={user} onNavigate={onNavigate} />;
        }
    };

    return (
        <main className="p-4 md:p-6 lg:p-8 flex-1">
            {renderPage()}
        </main>
    );
};

// --- PAGE CONTENT COMPONENTS ---

const DashboardPageContent: React.FC<{user: User; onNavigate: (page: Page) => void}> = ({ user }) => {
    return (
        <div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Bem-vindo(a), <span id="welcome-user-name">{user.name.split(' ')[0]}</span>!</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Seu perfil de acesso é: <span className="font-semibold" id="welcome-user-role">{user.role}</span>.</p>
            </div>
        </div>
    );
};

const ProductSearchPage: React.FC<{ page: 'drones' | 'consultas' | 'produtos'; user: User }> = ({ page, user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(INITIAL_PRODUCTS);

    const showPrice = page === 'consultas' || page === 'produtos';

    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const results = INITIAL_PRODUCTS.filter(product => 
            product.name.toLowerCase().includes(lowercasedTerm) || 
            product.spec.toLowerCase().includes(lowercasedTerm)
        );
        setFilteredProducts(results);
    }, [searchTerm]);

    return (
        <div>
            {page !== 'produtos' && (
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Buscar drones ou acessórios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} user={user} showPrice={showPrice} currentPage={page} />
                ))}
            </div>
        </div>
    );
};

const SobrePageContent: React.FC = () => {
    // Content for the "Sobre" page
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-brand-green dark:text-brand-orange mb-4">Sobre a Galvão Drones</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Nossa Missão</h3>
                    <p className="mt-1">Oferecer as mais avançadas soluções em tecnologia de drones, capacitando profissionais e empresas a atingirem novos patamares de eficiência, segurança e inovação.</p>
                </div>
            </div>
        </div>
    )
}

const AdminPageContent: React.FC = () => {
    // Content for the "Admin" page
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
             <div className="mb-6"><h2 className="text-2xl font-bold text-gray-800 dark:text-white">Configurações do Sistema</h2><p className="mt-1 text-gray-600 dark:text-gray-400">Gerencie usuários, produtos e fornecedores.</p></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"><h3 className="text-lg font-bold text-brand-orange">Gerir Usuários</h3><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Crie e gerencie acessos.</p></div>
                <div className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"><h3 className="text-lg font-bold text-brand-orange">Gerir Produtos</h3><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Adicione ou edite produtos do sistema.</p></div>
                <div className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"><h3 className="text-lg font-bold text-brand-orange">Gerir Fornecedores</h3><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Cadastre e edite fornecedores.</p></div>
            </div>
        </div>
    )
}

// --- REUSABLE UI ---

interface ProductCardProps {
    product: Product;
    user: User;
    showPrice: boolean;
    currentPage: 'drones' | 'consultas' | 'produtos';
}
const ProductCard: React.FC<ProductCardProps> = ({ product, user, showPrice, currentPage }) => {
    
    const handleSendProductWhatsapp = () => {
        // Change Request #2: Send price with 6% NF included
        const priceWithNf = product.price * 1.06;
        const formattedSpec = product.spec.replace(/🛸 |🎥 |🎛️ |🎙️ |🔋 |⚡/g, '').replace(/\n/g, '\n');
        
        const message = `🚀 Olá! Gostaria de te apresentar o produto:\n\n📦 Produto: *${product.name}*\n\n*Especificações:*\n${formattedSpec}\n\n💰 Valor (c/ NF 6%): *${currencyFormatter.format(priceWithNf)}*\n\nPara mais detalhes ou para fazer seu pedido, me chame aqui!`;
        
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    };

    const priceWithNf = product.price * 1.06;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-lg text-brand-green dark:text-brand-orange">{product.name}</h3>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1 whitespace-pre-wrap">{product.spec}</div>
                
                {showPrice && (
                    <div className="mt-4">
                        <p className="text-sm font-medium dark:text-gray-400">Valor de Venda: <span className="font-bold text-lg text-brand-green dark:text-brand-orange">{currencyFormatter.format(product.price)}</span></p>
                         <p className="text-xs font-medium dark:text-gray-400 mt-1">Venda com NF (6%): <span className="font-bold text-base text-blue-500">{currencyFormatter.format(priceWithNf)}</span></p>
                    </div>
                )}

                {/* Change Request #3: Show cost only to Admin on 'produtos' page */}
                {currentPage === 'produtos' && user.role === 'Administrador' && (
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <p className="text-sm font-semibold dark:text-gray-300">Custos por Fornecedor:</p>
                        <ul className="text-sm list-disc list-inside dark:text-gray-400">
                            {product.suppliers.map(s => <li key={s.name}>{s.name}: {currencyFormatter.format(s.cost)}</li>)}
                        </ul>
                    </div>
                )}
            </div>
            
            <div className="mt-4 pt-4 border-t dark:border-gray-700 grid grid-cols-2 gap-2 text-sm">
                <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-2 rounded-md hover:bg-gray-300">Gerar Descrição</button>
                <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-2 rounded-md hover:bg-gray-300">Criar Argumentos</button>
                {currentPage === 'drones' ? (
                     <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-2 rounded-md hover:bg-gray-300">Consultar Disp.</button>
                ) : (
                    <button onClick={handleSendProductWhatsapp} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 py-1 px-2 rounded-md hover:bg-green-200">Enviar WhatsApp</button>
                )}
                <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-2 rounded-md hover:bg-gray-300">Ajudar Cliente</button>
            </div>
        </div>
    );
};

// --- ICONS ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const DroneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.584C18.354 5.166 18 6.545 18 8c0 3.314-2.686 6-6 6H6.636A3.991 3.991 0 015.436 13.683z" /></svg>;
const BoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


export default App;