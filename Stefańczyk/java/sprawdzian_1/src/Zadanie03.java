import java.util.ArrayList;

public class Zadanie03 {
    public static void main(String[] args) {
        ArrayList<String> cos1= new ArrayList<>();
        String cos = "";
        System.out.println("Program rysuje tabliczkę mnożenia");
        for (int x = 1; x < 11; x++){
            cos = "";
            for (int y = 1; y < 11; y++) {
                cos+= Integer.toString(x*y) + " ";
            }
            cos1.add(cos);
        }

        for (int x = 0; x < cos1.size(); x++){
            System.out.println(cos1.get(x));
        }
    }
}
