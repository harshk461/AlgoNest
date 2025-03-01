export class Utils {
  static capitalize(word: string): string {
    if (!word) return ''; // Handle empty string case
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  static createResponse(
    status: 'success' | 'error',
    message: string,
    data: any = null,
  ) {
    return { status, message, ...(data !== null && { data }) };
  }
}
