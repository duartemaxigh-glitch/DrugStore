export default function ControlesTabs({ tab, setTab }) {
    return (
        <div className="controles-tabs">
            <button
                onClick={() => setTab('ventas')}
                className={`tab-button ${
                    tab === 'ventas'
                        ? 'tab-button-ventas-active'
                        : 'tab-button-inactive'
                }`}
            >
                Ventas
            </button>

            <button
                onClick={() => setTab('compras')}
                className={`tab-button ${
                    tab === 'compras'
                        ? 'tab-button-compras-active'
                        : 'tab-button-inactive'
                }`}
            >
                Compras
            </button>
        </div>
    );
}