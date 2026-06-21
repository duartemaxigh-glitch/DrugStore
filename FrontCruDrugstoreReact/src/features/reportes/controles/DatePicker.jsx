import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function DatePicker({ fecha, setFecha }) {
    return (
        <div className="date-picker">
            <CalendarDaysIcon className="date-picker-icon" />

            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="date-picker-input"
            />
        </div>
    );
}