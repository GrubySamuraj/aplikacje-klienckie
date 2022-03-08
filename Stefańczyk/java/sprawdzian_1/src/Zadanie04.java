public class Zadanie04 {
    public static void main(String[] args) {
        double[] tablica2 = {1.1,2.2,3.3,4.4,5.5,6.6,7.7,8.8,9.9};
        double suma = 0;
        double suma2 = 0;
        double suma3 = 0;
        for (int x = 0; x < tablica2.length; x++){
            suma += tablica2[x];
            if(tablica2[x] > 4.4){
                suma2 += tablica2[x];
            }
            if(x % 2 == 0){
                suma3+= tablica2[x];
            }
        }
        System.out.println("suma wszystkich elementów = " + suma);
        System.out.println("suma elementów większych od 4.4 = " + suma2);
        System.out.println("suma elementów parzystych = " + suma3);
    }
}
