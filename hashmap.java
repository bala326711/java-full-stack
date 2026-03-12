import java.util.HashMap;
import java.util.Map;
class Hash{
    public static void main(String[] args){
        HashMap<String, Integer> map = new HashMap<>();
        map.put("apple", 1);
        map.put("banana", 2);
        map.put("orange", 3);
        System.out.println(map.containsKey("lemon"));
        map.get("apple");
        for(map.Entry<String, Integer> entry : map.entrySet()){
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}