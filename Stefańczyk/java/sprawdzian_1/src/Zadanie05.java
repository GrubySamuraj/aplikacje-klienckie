public class Zadanie05 {
    public static void main(String[] args) {
        int[][] tablica5 = new int[][] {
                { 1, 2 },
                { 3, 3 },
                { 1, 4 },
                { 7, 3 },
                { 1, 6 },
                { 3, 5 },
                { 1, 8 },
                { 7, 9 }
        };
        int suma = 0;
        for(int x = 0; x < tablica5.length; x++ ) {
            suma+=tablica5[x][0];
        }
        System.out.println("wynik " + suma);
    }
}
