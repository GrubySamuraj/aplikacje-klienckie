import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;

public class Scrabble {
    public static void main(String[] args) {
        System.out.println(scoreWord("javascript"));
        System.out.println(scoreWord("java"));
    }
    static Integer score(String literka){
        String[] pkt1 = {"A", "E", "I", "O", "U", "L", "N", "R", "S", "T"};
        String[] pkt2 = {"D", "G"};
        String[] pkt3 = {"B", "C", "M", "P"};
        String[] pkt4 = {"F", "H", "V", "W", "Y"};
        String[] pkt5 = {"K"};
        String[] pkt8 = {"J","X"};
        String[] pkt10 = {"Q","Z"};
        for(int x = 0; x < pkt1.length; x++){
            if(literka.equals(pkt1[x])){
                return 1;
            }
        }
        for(int x = 0; x < pkt2.length; x++){
            if(literka.equals(pkt2[x])){
                return 2;
            }
        }
        for(int x = 0; x < pkt3.length; x++){
            if(literka.equals(pkt3[x])){
                return 3;
            }
        }
        for(int x = 0; x < pkt4.length; x++){
            if(literka.equals(pkt4[x])){
                return 4;
            }
        }
        for(int x = 0; x < pkt5.length; x++){
            if(literka.equals(pkt5[x])){
                return 5;
            }
        }
        for(int x = 0; x < pkt8.length; x++){
            if(literka.equals(pkt8[x])){
                return 8;
            }
        }
        for(int x = 0; x < pkt10.length; x++){
            if(literka.equals(pkt10[x])){
                return 10;
            }
        }
        return 0;
    }
    static Integer scoreWord(String slowo){
        slowo = slowo.toUpperCase(Locale.ROOT);
        String[] list = slowo.split("");
        int suma = 0;
        ArrayList<String> list1 = new ArrayList<>(Arrays.asList(list));
        for(int x = 0;x < list1.size();x++){
            suma += score(list1.get(x));
        }
        return suma;
    }


//    ArrayList<String> pkt1= new ArrayList<>();
}
