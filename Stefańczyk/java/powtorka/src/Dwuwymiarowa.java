public class Dwuwymiarowa {
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
        for(int x = 0; x < tablica5.length;x++){
            for(int y = 0; y < tablica5[x].length;y++) {
                if(y==0){
                    suma += tablica5[x][y];
                }
            }
        }
        System.out.println("Suma elementów tablicy, które mają 1 (jeden) w pierwszym indeksie wynosi: " + suma);

    }
}
