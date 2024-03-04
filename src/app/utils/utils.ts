export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const year: string = String(date.getFullYear()).slice(2);

    return `${day}/${month}/${year}`;
}