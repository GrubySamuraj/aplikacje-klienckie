import java.util.stream.IntStream;

import java.util.ArrayList;
import java.util.Scanner;
public class zadanie3_2 {

    public static void main(String[] args) {
        ArrayList<Integer> numerki = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Podaj liczbe: ");
        String input = sc.nextLine();
        int number = Integer.parseInt(input);
        PrintujListe(numerki, number);
    }

    static void PrintujListe(ArrayList<Integer> numerki, int n){
        int suma = 0;
        IntStream.range(1, n + 1).forEachOrdered(n1 -> {
            numerki.add(n1);
        });
        for (int x = 0; x < numerki.size(); x++){
            suma+=numerki.get(x);
        }
        System.out.println("Suma: " + suma);
    }
}
