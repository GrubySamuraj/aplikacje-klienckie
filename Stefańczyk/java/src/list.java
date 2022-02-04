import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class list {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>() {
            {
                add("a");
                add("b");
                add("c");
            }
        };
        System.out.println("ArrayList : " + list);
        ArrayList<Integer> items2 = new ArrayList<>();
        items2.add(1);
        items2.add(2);
        items2.add(3);

        for (int i = 0; i < items2.size(); i++) {
            System.out.println(items2.get(i));
        }
        for (Integer i : items2) {
            System.out.println(i);
        }
        Map<String, Integer> map1 = new HashMap<>() {
            {
                put("a", 100);
                put("b", 200);
                put("c", 300);
            }
        };

    }
}
