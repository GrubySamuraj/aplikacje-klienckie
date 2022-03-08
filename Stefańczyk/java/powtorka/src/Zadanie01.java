import java.util.ArrayList;
import java.util.Collections;

public class Zadanie01 {
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

    static void printujListe(ArrayList<String> lista){
        String str = "";
        for (int x = 0; x < lista.size(); x++){
            if(x != lista.size() - 1){
                str+=(lista.get(x) + "-");
            }
            else{
                str+=(lista.get(x) + ".");
            }
        }
        System.out.println(str);
    }
}
