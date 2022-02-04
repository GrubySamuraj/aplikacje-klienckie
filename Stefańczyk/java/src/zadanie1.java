import java.util.ArrayList;
import java.util.Collections;

public class zadanie1 {
    public static void main(String[] args) {
        System.out.println("SORTOWANIE");
        ArrayList<String> lista = new ArrayList<>();
        lista.add("Julia");
        lista.add("Agata");
        lista.add("Zenek");
        lista.add("Jarek");
        lista.add("Kasia");
        lista.add("Dominika");
        System.out.println("Elementy nieposortowane.");
        printujListe(lista);
        Collections.sort(lista);
        System.out.println("Elementy posortowane.");
        printujListe(lista);
    }
    static void printujListe(ArrayList<String> lista) {
        String str = "";
        for (int i=0;i<lista.size();i++){
            if(lista.size() - 1 != i) {
                str += lista.get(i) + "-";
            }
            else{
                str += lista.get(i) + ".";
            }
        }
        System.out.println(str);
    }
}
