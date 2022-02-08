import java.util.Map;
import java.util.HashMap;

public class map {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("a", 100);
        map.put("b", 200);
        map.put("c", 300);
        map.put("d", 400);
        map.put("a", 200);

        System.out.println(map);
        System.out.println(map.get("a"));
    }
}
