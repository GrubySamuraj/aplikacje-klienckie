import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.Arrays;

public class zadanie3_4 {
    public static void main(String[] args) {
        Map<ArrayList<String>, Integer> punkty = new HashMap<>(){
            {
                put(new ArrayList<>(Arrays.asList("A","E","I","O","U","L","N","R","S","T")), 1);
//                put(new ArrayList<>(Arrays.asList("A","E","I","O","U","L","N","R","S","T")), 1);
                put(new ArrayList<>(Arrays.asList("D", "G")),2);
                put(new ArrayList<>(Arrays.asList("B","C","M","P")),3);
                put(new ArrayList<>(Arrays.asList("F", "H", "V", "W", "Y")),4);
                put(new ArrayList<>(Arrays.asList("J", "X")),8);
                put(new ArrayList<>(Arrays.asList("Q", "Z")), 10);
            }
        };
    }
}
