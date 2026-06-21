import ControlesTabs from "./ControlesTabs";
import DatePicker from "./DatePicker";

export default function Controles({ fecha, tab, setFecha, setTab }) {
    return (
        <div className="controles">
            <ControlesTabs
                tab={tab}
                setTab={setTab}
            />

            <DatePicker
                fecha={fecha}
                setFecha={setFecha}
            />
        </div>
    );
}