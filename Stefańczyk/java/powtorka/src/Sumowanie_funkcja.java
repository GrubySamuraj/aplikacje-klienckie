import java.util.ArrayList;
import java.util.Scanner;

public class Sumowanie_funkcja {
    public static void main(String[] args) {
        System.out.println("Podaj n: ");
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine());
        ArrayList<Integer> lista = new ArrayList<>();
        for(int x = 0;x < n + 1; x++){
            lista.add(x);
        }
        printujListe(lista,n);
    }
    static void printujListe(ArrayList<Integer> lista, int n){
        int suma = 0;
        for(int x = 0; x < lista.size();x++){
            suma += lista.get(x);
        }
        System.out.println("Wszystkie elementy: " + lista);
        System.out.println("Suma = " + suma);
    }
}
