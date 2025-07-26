async function StepExport({ Code }) {
    const API_BASE = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${API_BASE}/api/SolidWorks/SolidworksApi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Code }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            return true;
        } else {
            alert(data.message);
            return false;
        }
    }
    catch (error) {
        console.error("Error exporting model:", error);
    };
}

export default StepExport;