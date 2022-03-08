public class Arrays {
    public static void main(String[] args) {
        int[] tablica1 = {2,5,43,11,23,78,333,765,67,67,67,111,123};
        int suma = 0;
        for(int x = 0; x < tablica1.length; x++){
            suma+=tablica1[x];
        }
        System.out.println("Suma jest równa: " + suma);
    }

}
